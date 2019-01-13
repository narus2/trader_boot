package servise.model;

public class Bot_setting {
    public String id;
    public String publicKey;
    public String privateKey;
    public Class aClass;
    public int duration;  //Временной ряд 1, 5, 30 мин, 1час, ..

    public Bot_setting(String id, Class aClass, String publicKey, String  privateKey, int duration) {
        this.aClass = aClass;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.duration = duration;
    }
    public Bot_setting(String id, Class aClass, String publicKey, String  privateKey) {
        this.id = id;
        this.aClass = aClass;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.duration = 300;
    }

}
