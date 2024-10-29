import glob
import os
import random
import cv2
from configs import DATALOADER_CONFIG

# default shape: square

upper_left_corner_x = 0
upper_left_corner_y = 0
# bottom_right_corner_x = DATALOADER_CONFIG['image_size'] - 1
# bottom_right_corner_y = DATALOADER_CONFIG['image_size'] - 1

for img_file in sorted(glob.glob(os.path.join(DATALOADER_CONFIG['path_inpainting_complete'], "*.jpg"))):
    image = cv2.imread(img_file)
    image_res = cv2.imread(img_file)
    name = os.path.basename(img_file)

    bottom_right_corner_x = image.shape[0] - 1
    bottom_right_corner_y = image.shape[1] - 1

    start_x = random.Random().randint(upper_left_corner_x, bottom_right_corner_x)
    start_y = random.Random().randint(upper_left_corner_y, bottom_right_corner_y)

    end_x = random.Random().randint(upper_left_corner_x, bottom_right_corner_x)
    end_y = random.Random().randint(upper_left_corner_y, bottom_right_corner_y)

    for pixel_x in range(min(start_x, end_x), max(start_x, end_x)):
        for pixel_y in range(min(end_y, start_y), max(end_y, start_y)):
            image[pixel_x, pixel_y] = 0
    cv2.imwrite(img_file, cv2.resize(image_res, (DATALOADER_CONFIG['image_size'],
                                                 DATALOADER_CONFIG['image_size'])))
    cv2.imwrite(os.path.join(DATALOADER_CONFIG[f'path_inpainting_incomplete'], name),
                cv2.resize(image, (DATALOADER_CONFIG['image_size'],
                                   DATALOADER_CONFIG['image_size'])))
