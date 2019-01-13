package servise.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    @CrossOrigin
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // создадим адреса куда сервис будет слать инфу
        config.enableSimpleBroker("/topic", "/queue");

        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    @CrossOrigin
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
                .addEndpoint("/greeting")
                .setAllowedOrigins("*");
               // .withSockJS();
    }

}
