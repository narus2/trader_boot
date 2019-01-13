package servise;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import servise.model.MyEvent;
import xchange.Bot_servise;

@Component
public class ScheduledTasks implements ApplicationEventPublisherAware {
    protected ApplicationEventPublisher mApplicationEventPublisher;


    private boolean is_run = false;
    Bot_servise m = new Bot_servise();

    @Scheduled(fixedRate = 5000)
    public void reportCurrentTime() {
        if (m.publisher == null) {
            m.publisher = mApplicationEventPublisher;
        }

         if (is_run) {
            m.run_st();
        }
    }

    @EventListener()
    public void handleEvent(MyEvent event) {
        if (event.getSource().contains("start")& event.getMsg().equals(true)){
            is_run = true;
        } else
            if (event.getSource().contains("tickets") ){
                mApplicationEventPublisher.publishEvent(new MyEvent("tickets", this.m.get_tickets()));
            }
    }

    @Override
    public void setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        mApplicationEventPublisher = applicationEventPublisher;
    }
}
