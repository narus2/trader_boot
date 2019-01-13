package servise;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class RESTController {
//    @Autowired
//    ApplicationEventPublisher publisher;
//
    @RequestMapping("/")
    @ResponseBody
    public String welcome() {
        return "Welcome to RestTemplate Example.";
    }
//
//    @RequestMapping(value = "/start")
//    @ResponseBody
//    public String getStart() {
//         publisher.publishEvent(new MyEvent("true","Started"));
//        return "started";
//    }
//    @RequestMapping(value = "/stop")
//    @ResponseBody
//    public String getSrop() {
//        publisher.publishEvent(new MyEvent("false" ,"Stoped"));
//        return " stoping";
//    }
//
//    @RequestMapping(value = "/getTicket")
//    @ResponseBody
//    public String getTicket() {
//        //return
//        publisher.publishEvent(new MyEvent("true","Started"));
//        return "started";
//    }

}
