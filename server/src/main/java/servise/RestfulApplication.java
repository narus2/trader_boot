package servise;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class RestfulApplication extends SpringBootServletInitializer {
    public static void main (String[] args)

    {
          SpringApplication sa = new SpringApplication(RestfulApplication.class);
        ConfigurableApplicationContext context = sa.run(args);

    }
}
