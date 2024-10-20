package com.taip.FillTheVoid.painting;

import java.util.List;

public interface Iterator <T> {

    boolean hasNext();
    Painting getNext();
    void reset();
}
