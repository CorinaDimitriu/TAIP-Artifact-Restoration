import torch.nn
from torch.utils.data import Dataset
from torchvision.io import read_image


class PairedDataset(Dataset):
    def __init__(self, root_images, build_dataset, transformations=None, training=True):
        self.transformations = transformations if transformations is not None else torch.nn.Identity
        self.photos_paintings, self.dataset_size = build_dataset(root_images)
        self.training = training

    def __len__(self):
        return self.dataset_size

    def __getitem__(self, index):
        file = self.photos_paintings[index][0]  # Don't transform the original features
        image = read_image(file) / 255.0  # basic normalization
        file = self.photos_paintings[index][1]  # Don't transform the original features
        image1 = read_image(file) / 255.0  # basic normalization
        return (self.transformations(image, training=self.training),
                self.transformations(image1, training=self.training))
