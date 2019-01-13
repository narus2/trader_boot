package servise.config;

import org.knowm.xchange.binance.BinanceExchange;
import org.knowm.xchange.exmo.ExmoExchange;
import servise.model.Bot_setting;

import java.util.ArrayList;

public class Bot_settings {

    public static  ArrayList<Bot_setting> getList() {
        ArrayList<Bot_setting> list = new ArrayList<>();
        list.add(new Bot_setting("Exmo", ExmoExchange.class, "K-bb99c6cec34b24dc2bdd7250b2541d2a4fbbee6e", "S-d4411e7f4ba1af42900f5f05f0091ee5dbb16321") );
        list.add(new Bot_setting("Binance" ,BinanceExchange.class, "599fb900-05d1-4029-8b0d-bd87bff333db", "8cZRt3XFMGJpyTME") );
        return list;
    }

    public static  Bot_setting getByName(String name){
        return  getList().stream().filter(botsetting -> botsetting.id.contains(name) ).findFirst().get();
    }


}
