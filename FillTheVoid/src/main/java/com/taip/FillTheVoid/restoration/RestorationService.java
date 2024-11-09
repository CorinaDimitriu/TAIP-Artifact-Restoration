package com.taip.FillTheVoid.restoration;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RestorationService {

    public RestoredImage getRestoredImage(Corners corners, String imageType, byte[] image) {

        RestoredImage newRestoredImage = restorePythonCode(corners, imageType, image);

        return newRestoredImage;
    }

    public RestoredImage restorePythonCode(Corners corners, String imageType, byte[] image) {

        System.out.println("Here use pythonic code to restore and obtain new restoredImage");
        System.out.println(corners);

        // TODO restoredImage should be changed (in this example is returned same image)
        byte[] restoredImage = image;

        RestoredImage newRestoredImage = new RestoredImage(imageType, restoredImage);

        return newRestoredImage;
    }
}
