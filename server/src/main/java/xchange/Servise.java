package xchange;

import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeFactory;
import org.knowm.xchange.ExchangeSpecification;
import org.knowm.xchange.currency.CurrencyPair;
import org.knowm.xchange.dto.marketdata.Ticker;
import org.knowm.xchange.dto.marketdata.Trade;
import org.knowm.xchange.dto.marketdata.Trades;
import org.knowm.xchange.service.marketdata.MarketDataService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.ta4j.core.Bar;
import org.ta4j.core.BaseBar;
import org.ta4j.core.BaseTimeSeries;
import org.ta4j.core.TimeSeries;
import servise.model.Bot_setting;
import servise.model.MyEvent;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Stream;

@Service
public class Servise {
    public ApplicationEventPublisher publisher;
    String name;
    ExchangeSpecification spec;
    private Exchange btcTrade;
    private Duration duration;
    TimeSeries series;
    CurrencyPair pair;

    public void pushEvent(MyEvent msg){
        try {
            publisher.publishEvent(msg);
        } catch (Exception e) {
            System.out.println(e.toString());
        };
    }

    public Servise(Bot_setting botsetting, CurrencyPair pair) {
        this.name = botsetting.id;
        this.spec = new ExchangeSpecification(botsetting.aClass);
        this.spec.setApiKey(botsetting.publicKey);
        this.spec.setSecretKey(botsetting.privateKey);
        this.duration = Duration.ofSeconds(botsetting.duration);
        this.pair = pair;
        btcTrade = ExchangeFactory.INSTANCE.createExchange(spec);
        this.series = new BaseTimeSeries(this.name + "_trades");
        this.series.setMaximumBarCount(200);
    }

    private void addBar(ZonedDateTime time_BAR ,double tradePrice, double tradeAmount )
    {

        Bar tbar;
        if(series.isEmpty()){
            tbar = new BaseBar(duration, time_BAR);
            tbar.addTrade(tradeAmount, tradePrice);
            series.addBar(tbar);
            return;
        }else {
            tbar = series.getBar(series.getEndIndex());
        }
        if(tbar.inPeriod(time_BAR)| tbar.getEndTime().equals(time_BAR)|tbar.getBeginTime().equals(time_BAR) ) {
            tbar.addTrade(tradeAmount, tradePrice);
        }else {
            tbar = new BaseBar(duration, time_BAR);
            tbar.addTrade(tradeAmount, tradePrice);

            series.addBar(tbar);
        }
        pushEvent(new MyEvent("tbar", tbar));
    }

    public void update_series(){
        List<Bar> bars = null;
        try {
            btcTrade.remoteInit();
            MarketDataService marketDataService = btcTrade.getMarketDataService();
            if (series.getBarCount()==0) {
                HashMap<String, String> arg = new HashMap<>();
                arg.put("size", "10000");
                Trades trade = marketDataService.getTrades(pair, arg);

                Supplier<Stream<Trade>> tr = () -> trade.getTrades().stream().filter(o -> o.getType().equals(org.knowm.xchange.dto.Order.OrderType.BID));
                Date tBeginTime = new Date(tr.get().min(Comparator.comparingLong(o -> o.getTimestamp().getTime())).get().getTimestamp().getTime() * 1000);
                Date tEndTime = new Date(tr.get().max(Comparator.comparingLong(o -> o.getTimestamp().getTime())).get().getTimestamp().getTime() * 1000);
                if (tBeginTime.before(tEndTime)) {
                    tr.get().forEach(o -> {
                        ZonedDateTime tradeTimeStamp = ZonedDateTime.ofInstant(Instant.ofEpochMilli(o.getTimestamp().getTime() * 1000), ZoneId.systemDefault());
                        addBar(tradeTimeStamp, o.getPrice().doubleValue(), o.getOriginalAmount().doubleValue());
                    });
                }
            }else {
                Ticker ticker = marketDataService.getTicker(CurrencyPair.BTC_USD);
               // pushEvent(new MyEvent("bar", ticker));
                ZonedDateTime time_BAR = ZonedDateTime.ofInstant(Instant.ofEpochMilli(ticker.getTimestamp().getTime() * 1000), ZoneId.systemDefault());
                double tradePrice = ticker.getBid().doubleValue();
                double tradeAmount = ticker.getVolume().doubleValue();
                addBar(time_BAR, tradePrice, tradeAmount);
            }
        } catch (IOException e1) {
            e1.printStackTrace();
        }
    }
 }
