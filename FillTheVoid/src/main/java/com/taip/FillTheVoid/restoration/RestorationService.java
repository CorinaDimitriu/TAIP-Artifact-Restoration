package com.taip.FillTheVoid.restoration;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;


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


        saveAsPng(image);

//        run scipt

        List<String> allLinesRestoration = runScriptRestoration();
        System.out.println(allLinesRestoration);



        // TODO restoredImage should be changed (in this example is returned same image)
        byte[] restoredImage = readImage("src/main/java/com/taip/FillTheVoid/restoration/restored_image.png");


        RestoredImage newRestoredImage = new RestoredImage(imageType, restoredImage);


        return newRestoredImage;
    }

    private void writeBase64ToFile(String base64Image) {
        // Specify the path of the file where the Base64 string should be written
        String filePath = "src/main/java/com/taip/FillTheVoid/restoration/output_image.txt";

        // Create a new File object
        File file = new File(filePath);

        try {
            // Check if the file exists, if not create it
            if (!file.exists()) {
                if (file.createNewFile()) {
                    System.out.println("File created: " + filePath);
                } else {
                    System.err.println("Failed to create the file.");
                    return;
                }
            }

            // Write the Base64 string to the file
            try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
                writer.write(base64Image);
                System.out.println("Base64 string written to " + filePath);
            }
        } catch (IOException e) {
            System.err.println("Error writing to file: " + e.getMessage());
        }

    }

    public void saveAsPng(byte[] image) {
        BufferedImage bufferedImage = null;
        try {
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(image);
            bufferedImage = ImageIO.read(byteArrayInputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Specify the output file path where you want to save the PNG
        String outputFilePath = "src/main/java/com/taip/FillTheVoid/restoration/restored_image.png";

        // Save the BufferedImage to a file as PNG
        try {
            if (bufferedImage != null) {
                File outputFile = new File(outputFilePath);
                ImageIO.write(bufferedImage, "PNG", outputFile);
                System.out.println("Image saved as PNG at: " + outputFilePath);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static byte[] readImage(String filePath) {
        Path path = Paths.get(filePath);
        byte[] imageBytes = null;
        try {
            imageBytes = Files.readAllBytes(path);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return imageBytes;
    }

    public List<String> runScriptRestoration() {

        String pythonExecutable = "myenv/bin/python";
        String pythonScriptPath = "src/main/java/com/taip/FillTheVoid/restoration/restoration.py";

        String[] command = new String[]{pythonExecutable, pythonScriptPath};

        try {
            ProcessBuilder pb = new ProcessBuilder(command);
            Process process = pb.start();

            BufferedReader stdInput = new BufferedReader(new InputStreamReader(process.getInputStream()));
            BufferedReader stdError = new BufferedReader(new InputStreamReader(process.getErrorStream()));

            String s = null;
            List<String> allLines = new ArrayList<>();

            while ((s = stdInput.readLine()) != null) {
                allLines.add(s);

            }

            while ((s = stdError.readLine()) != null) {
                System.out.println(s);
            }

            return allLines;

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
