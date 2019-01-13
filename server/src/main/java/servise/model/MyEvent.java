package servise.model;

import org.springframework.context.ApplicationEvent;

public class MyEvent extends ApplicationEvent {
    private final Object msg;

    @Override
    public String getSource() {
        return source;
    }

    private final String source;

    public MyEvent (String source, Object msg) {
        super("MyEvent");
        this.source  =source;
        this.msg = msg;
    }

    public Object getMsg () {
        return msg;
    }
}