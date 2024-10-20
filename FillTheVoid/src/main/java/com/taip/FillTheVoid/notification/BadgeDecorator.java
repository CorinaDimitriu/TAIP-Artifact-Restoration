package com.taip.FillTheVoid.notification;

public class BadgeDecorator extends BaseNotifierDecorator{

    protected BadgeDecorator(INotifier wrapped) {
        super(wrapped);
    }

    @Override
    public void send(String message) {

        super.send(message);



    }
}
