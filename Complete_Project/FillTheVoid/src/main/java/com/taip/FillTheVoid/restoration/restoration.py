import subprocess
import os
import sys
import json
import cv2
import numpy as np


if __name__ == '__main__':
    os.chdir("..\\GraphFill-main")

    json_corners = sys.argv[1]
    corners = json.loads(json_corners)
    left_up_x = corners["leftUp"]["x"]
    left_up_y = corners["leftUp"]["y"]
    # Accesăm coordonatele 'RightUp'
    right_up_x = corners["rightUp"]["x"]
    right_up_y = corners["rightUp"]["y"]
    # Accesăm coordonatele 'LeftDown'
    left_down_x = corners["leftDown"]["x"]
    left_down_y = corners["leftDown"]["y"]
    # Accesăm coordonatele 'RightDown'
    right_down_x = corners["rightDown"]["x"]
    right_down_y = corners["rightDown"]["y"]
    # Afișăm coordonatele
    print("LeftUp x:", left_up_x, ", y:", left_up_y)
    print("RightUp x:", right_up_x, ", y:", right_up_y)
    print("LeftDown x:", left_down_x, ", y:", left_down_y)
    print("RightDown x:", right_down_x, ", y:", right_down_y)

    output_path_1 = ".\\demo_data\\celeb\\images\\output_mask.png"
    output_path_2 = ".\\demo_data\\celeb\\places\\output_mask.png"
    image = np.zeros((256, 256, 3), dtype=np.uint8)
    cv2.rectangle(image, (left_up_x, left_up_y), (right_down_x, right_down_y),
                  (255, 255, 255), thickness=-1)  # -1 fill the rectangle
    cv2.imwrite(output_path_1, image)
    cv2.imwrite(output_path_2, image)

    venv_path = "venv"
    activate_command = f"{os.getcwd()}\\{venv_path}\\Scripts\\activate.bat"
    print(activate_command)

    # Run the command with activation
    _command = (f"{activate_command} "
               f"&& python main.py config=main.yaml util_args.predict_only=True util_args.eval_mode=True data=celeb_256")
    _result = subprocess.run(_command)
    # command_ = (f"{activate_command} "
    #            f"&& python main.py config=main.yaml util_args.predict_only=True util_args.eval_mode=True data=places_256")
    # result_ = subprocess.run(command_)
    os.chdir("..\\FillTheVoid")
