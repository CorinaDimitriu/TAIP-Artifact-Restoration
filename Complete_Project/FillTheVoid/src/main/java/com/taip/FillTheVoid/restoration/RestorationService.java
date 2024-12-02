package com.taip.FillTheVoid.restoration;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@AllArgsConstructor
public class RestorationService {

    public RestoredImage getRestoredImage(String selectedModel, CornersList cornersList, String imageType, byte[] image) {

        RestoredImage newRestoredImage = (RestoredImage) restorePythonCode(selectedModel, cornersList, imageType, image).get("newRestoredImage");

        return newRestoredImage;
    }

    public Map<String, Object> restorePythonCodeCustom(String selectedModel, CornersList cornersList, String imageType, byte[] image,
                                                       String modelVersion, String outputPath)
    {
        System.out.println("Here use pythonic code to restore and obtain new restoredImage");
//        System.out.println(cornersList);

        List<String> allLinesRestoration = runScriptRestoration(selectedModel, cornersList, modelVersion);
        Double score = Double.valueOf(allLinesRestoration.getLast());
//        System.out.println(score);

        byte[] _restoredImage = readImage(outputPath);

        RestoredImage newRestoredImage = new RestoredImage(imageType, _restoredImage);

        Map<String, Object> result = new HashMap<>();
        result.put("score", score);
        result.put("newRestoredImage", newRestoredImage);
        return result;
    }

    public Map<String, Object> restorePythonCode(String selectedModel, CornersList cornersList, String imageType, byte[] image) {

        System.out.println("Here use pythonic code to restore and obtain new restoredImage");
//        System.out.println(cornersList);

        saveAsPng(image);

//        run script

        String modelVersion = "python main.py config=main.yaml util_args.predict_only=False util_args.eval_mode=True data=celeb_256";
        List<String> allLinesRestoration = runScriptRestoration(selectedModel, cornersList, modelVersion);
        Double score = Double.valueOf(allLinesRestoration.getLast());
//        System.out.println(allLinesRestoration);
//        System.out.println("\n");

        byte[] _restoredImage = readImage("..\\GraphFill-main\\val_results\\celeb\\c2f_iter\\output.png");

        RestoredImage newRestoredImage = new RestoredImage(imageType, _restoredImage);


        Map<String, Object> result = new HashMap<>();
        result.put("score", score);
        result.put("newRestoredImage", newRestoredImage);
        return result;
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
        String _outputFilePath = "..\\GraphFill-main\\demo_data\\celeb\\images\\output.png";
        String outputFilePath_ = "..\\GraphFill-main\\demo_data\\places\\images\\output.png";

        // Save the BufferedImage to a file as PNG
        try {
            if (bufferedImage != null) {
                File _outputFile = new File(_outputFilePath);
                ImageIO.write(bufferedImage, "PNG", _outputFile);
                System.out.println("Image saved as PNG at: " + _outputFilePath);

                File outputFile_ = new File(outputFilePath_);
                ImageIO.write(bufferedImage, "PNG", outputFile_);
                System.out.println("Image saved as PNG at: " + outputFilePath_);
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

    public List<String> runScriptRestoration(String selectedModel, CornersList cornersList, String modelVersion) {

        String pythonExecutable;

        if (System.getProperty("os.name").toLowerCase().contains("win")) {
            pythonExecutable = "myenv/Scripts/python.exe";
        } else {
            pythonExecutable = "myenv/bin/python";
        }

        String pythonScriptPath = "src/main/java/com/taip/FillTheVoid/restoration/restoration.py";

        String jsonCorners = convertCornersToJson(cornersList);

//        System.out.println(jsonCorners);

        String[] command = new String[]{pythonExecutable, pythonScriptPath, selectedModel, jsonCorners, modelVersion};

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


    public static String convertCornersToJson(CornersList cornersList) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonString = objectMapper.writeValueAsString(cornersList);

            if (System.getProperty("os.name").toLowerCase().contains("win")) {

                jsonString = jsonString.replace("\"", "\\\"");
                return "\"" + jsonString + "\"";
            } else {
                return objectMapper.writeValueAsString(cornersList);
            }


        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
