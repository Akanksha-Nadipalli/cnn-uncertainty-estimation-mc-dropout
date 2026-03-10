from torchvision import transforms

transform = transforms.Compose([
    transforms.Resize((32,32)),
    transforms.ToTensor()
])

def preprocess(image):

    image = transform(image)

    image = image.unsqueeze(0)

    return image