package servise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import servise.model.MyEvent;
import servise.model.User;

@Controller
public class WebController {
    private final SimpMessagingTemplate template;
    @Autowired
    ApplicationEventPublisher publisher;

    @Autowired
    public WebController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/send/message")  //Принимаем сообщкения тут
    public void onResiveMessage(MyEvent message){
        publisher.publishEvent(message);
    }

    @MessageMapping("/topic")
    public void greeting(User user) throws Exception {
        this.template.convertAndSend("/topic/hi",
        new MyEvent("Start","Hi, " + user.getName() + "!") );
    }

    @EventListener
    public void handleEvent(MyEvent event) {
        this.template.convertAndSend("/topic/hi", event);
    }

//    @EventListener()
//    public void handleEvent(SessionConnectedEvent event) {
//        System.out.println(event.toString());
//        publisher.publishEvent(new MyEvent("Start",true));
//    }

    @EventListener()
    public void handleEvent(Object event) {
        System.out.println("ct event: "+event);

    }

}
