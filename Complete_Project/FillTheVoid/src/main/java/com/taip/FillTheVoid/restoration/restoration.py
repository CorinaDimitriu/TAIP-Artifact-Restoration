import subprocess
import os
import sys
import json
import cv2
import numpy as np

if __name__ == '__main__':
    os.chdir("..\\GraphFill-main")
    selected_model = sys.argv[1]
    json_corners = sys.argv[2]
    corners_data = json.loads(json_corners)
    # Extract the list of corners from the "corners" field
    corners_list = corners_data.get("corners")
    if not corners_list:
        print("The list of corners is empty or missing!")
        sys.exit(1)

    output_path_1 = ".\\demo_data\\celeb\\images\\output_mask.png"
    output_path_2 = ".\\demo_data\\celeb\\places\\output_mask.png"
    image = np.zeros((256, 256, 3), dtype=np.uint8)
    for rectangle in corners_list:
        left_up_x = rectangle["leftUp"]["x"]
        left_up_y = rectangle["leftUp"]["y"]

        right_up_x = rectangle["rightUp"]["x"]
        right_up_y = rectangle["rightUp"]["y"]

        left_down_x = rectangle["leftDown"]["x"]
        left_down_y = rectangle["leftDown"]["y"]

        right_down_x = rectangle["rightDown"]["x"]
        right_down_y = rectangle["rightDown"]["y"]

        # Afișăm coordonatele
        # print("LeftUp x:", left_up_x, ", y:", left_up_y)
        # print("RightUp x:", right_up_x, ", y:", right_up_y)
        # print("LeftDown x:", left_down_x, ", y:", left_down_y)
        # print("RightDown x:", right_down_x, ", y:", right_down_y)
        cv2.rectangle(image, (left_up_x, left_up_y), (right_down_x, right_down_y),
                      (255, 255, 255), thickness=-1)  # -1 fill the rectangle
        cv2.imwrite(output_path_1, image)
        cv2.imwrite(output_path_2, image)
    venv_path = "venv"
    activate_command = f"{os.getcwd()}\\{venv_path}\\Scripts\\activate.bat"
    # print(activate_command)

    # Run the command with activation
    command = sys.argv[3]
    _command = (f"{activate_command} "
                f"&& {command}")
    _result = subprocess.run(_command)
    with open('.\\val_results\\val_results.txt', 'r') as file:
        for line in file.readlines():
            line = line.strip().split(' : ')
            if line[0] == 'val_ssim_fid100_f1_total_mean':
                score = line[1]
                break
    print(score)
    # command_ = (f"{activate_command} "
    #            f"&& python main.py config=main.yaml util_args.predict_only=True util_args.eval_mode=True data=places_256")
    # result_ = subprocess.run(command_)
    os.chdir("..\\FillTheVoid")
