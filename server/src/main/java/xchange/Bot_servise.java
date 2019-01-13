package xchange;

import org.knowm.xchange.currency.CurrencyPair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.ta4j.core.*;
import org.ta4j.core.indicators.CCIIndicator;
import org.ta4j.core.indicators.RSIIndicator;
import org.ta4j.core.indicators.SMAIndicator;
import org.ta4j.core.indicators.helpers.ClosePriceIndicator;
import org.ta4j.core.trading.rules.CrossedDownIndicatorRule;
import org.ta4j.core.trading.rules.CrossedUpIndicatorRule;
import org.ta4j.core.trading.rules.OverIndicatorRule;
import org.ta4j.core.trading.rules.UnderIndicatorRule;
import servise.config.Bot_settings;
import servise.model.MyEvent;

import java.util.List;

@Component
public class Bot_servise {

    private final Strategy strategy;
    private final Servise servise;

    @Autowired
    public ApplicationEventPublisher publisher;

    private long ordered = 0;
    private long orderProfit = 0;

   public void pushEvent(MyEvent msg){
        try {

            publisher.publishEvent(msg);
        } catch (Exception e) {
            System.out.println(e.toString());
        };
    }

    public Bot_servise() {
        servise = new Servise(Bot_settings.getByName("Exmo"), CurrencyPair.BTC_USD);
        //servise = new Servise(Bot_settings.getByName("Binance"), CurrencyPair.BTC_USD);

        strategy = buildRSI2Strategy(servise.series);
    }

    public List<Bar> get_tickets(){
       return this.servise.series.getBarData();
    }

    public  void run_st() {

        if (servise.publisher == null){
            servise.publisher = this.publisher;
        }
        servise.update_series();

        TimeSeriesManager seriesManager = new TimeSeriesManager(servise.series);

        TradingRecord tradingRecord = seriesManager.run(strategy);

        int endIndex = servise.series.getEndIndex();

        if (strategy.shouldEnter(endIndex)) {
            pushEvent(new MyEvent("strategy on" , "+" ) );
            boolean entered = tradingRecord.enter(endIndex);
            if (entered) {
                Order entry = tradingRecord.getLastEntry();
                pushEvent(new MyEvent("Entered on " + entry.getType() , " (price=" + entry.getPrice().doubleValue()
                        + ", amount=" + entry.getAmount().doubleValue() + ")" ) );
                ordered = entry.getPrice().longValue();
            }
        } else if (strategy.shouldExit(endIndex)) {
            pushEvent(new MyEvent("strategy out" , "-" ) );
            boolean exited = tradingRecord.exit(endIndex);
            if (exited) {
                Order exit = tradingRecord.getLastExit();
                pushEvent(new MyEvent("Order close "+ exit.getType() , " (price=" + exit.getPrice().doubleValue()
                        + ", amount=" + exit.getAmount().doubleValue() + ")" ) );
                if (ordered != 0 ){
                    orderProfit = exit.getPrice().longValue() - ordered;}
                pushEvent(new MyEvent("Profit" , String.valueOf(orderProfit) ));
            }
        }
    }

    private  Strategy buildStrategy(TimeSeries series) {
        if (series == null) {
            throw new IllegalArgumentException("Series cannot be null");
        }

        ClosePriceIndicator closePrice = new ClosePriceIndicator(series);
        SMAIndicator sma = new SMAIndicator(closePrice, 12);

        // Signals
        // Buy when SMA goes over close price
        // Sell when close price goes over SMA
        return new BaseStrategy("Def_Strategy",
                new OverIndicatorRule(sma, closePrice),
                new UnderIndicatorRule(sma, closePrice)
        );
    }
    private  Strategy buildRSI2Strategy(TimeSeries series) {
        if (series == null) {
            throw new IllegalArgumentException("Series cannot be null");
        }

        ClosePriceIndicator closePrice = new ClosePriceIndicator(series);
        SMAIndicator shortSma = new SMAIndicator(closePrice, 5);
        SMAIndicator longSma = new SMAIndicator(closePrice, 200);

        // We use a 2-period RSI indicator to identify buying
        // or selling opportunities within the bigger trend.
        RSIIndicator rsi = new RSIIndicator(closePrice, 14);

        // Entry rule
        // The long-term trend is up when a security is above its 200-period SMA.
        Rule entryRule = new OverIndicatorRule(shortSma, longSma) // Trend
                .and(new CrossedDownIndicatorRule(rsi, Decimal.valueOf(5))) // Signal 1

                .and(new OverIndicatorRule(shortSma, closePrice)); // Signal 2

        // Exit rule
        // The long-term trend is down when a security is below its 200-period SMA.
        Rule exitRule = new UnderIndicatorRule(shortSma, longSma) // Trend
                .and(new CrossedUpIndicatorRule(rsi, Decimal.valueOf(95))) // Signal 1
                .and(new UnderIndicatorRule(shortSma, closePrice)); // Signal 2


        return new BaseStrategy("RSI2Strategy",entryRule, exitRule);
    }
    private  Strategy buildCCICorrectionStrategy(TimeSeries series) {


        if (series == null) {
            throw new IllegalArgumentException("Series cannot be null");
        }

        CCIIndicator longCci = new CCIIndicator(series, 200);
        CCIIndicator shortCci = new CCIIndicator(series, 5);
        Decimal plus100 = Decimal.HUNDRED;
        Decimal minus100 = Decimal.valueOf(-100);

        Rule entryRule = new OverIndicatorRule(longCci, plus100) // Bull trend
                .and(new UnderIndicatorRule(shortCci, minus100)); // Signal

        Rule exitRule = new UnderIndicatorRule(longCci, minus100) // Bear trend
                .and(new OverIndicatorRule(shortCci, plus100)); // Signal

        Strategy strategy = new BaseStrategy("CCICorrectionStrategy", entryRule, exitRule);
        strategy.setUnstablePeriod(5);
        return strategy;
    }

}
