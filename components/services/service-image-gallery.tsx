import React, { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

interface ServiceImageGalleryProps {
  images: { image: string }[];
}

const ServiceImageGallery: React.FC<ServiceImageGalleryProps> = ({ images }) => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImagePress = (image: string, index: number) => {
    setModalImage(image);
    setCurrentImageIndex(index);
  };

  const goToNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      const nextIndex = currentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
      setModalImage(images[nextIndex].image);
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      const prevIndex = currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setModalImage(images[prevIndex].image);
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      {/* Image Gallery */}
      <View className="bg-white rounded-xl mb-4">
        <View className="flex flex-row flex-wrap w-full gap-5 mb-3">
          {images.slice(0, 4).map((img, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleImagePress(img.image, idx)}
            >
              <Image
                source={{ uri: img.image }}
                className="w-48 h-48 rounded-lg"
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Image Modal with Navigation */}
      <Modal
        visible={!!modalImage}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalImage(null)}
      >
        <View className="flex-1 bg-black/90 justify-center items-center">
          {/* Close Button */}
          <TouchableOpacity
            style={{ position: 'absolute', top: 60, right: 30, zIndex: 10 }}
            onPress={() => setModalImage(null)}
          >
            <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
              <View className="w-6 h-6 bg-white rounded-full items-center justify-center">
                <Text className="text-black font-bold">X</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Previous Button */}
          {currentImageIndex > 0 && (
            <TouchableOpacity
              style={{ position: 'absolute', left: 20, zIndex: 10 }}
              onPress={goToPreviousImage}
              className="w-12 h-12 bg-white/20 rounded-full items-center justify-center"
            >
              <View className="w-8 h-8 bg-white rounded-full items-center justify-center">
                <View className="w-4 h-4 bg-black rounded-full rotate-45 transform origin-center" />
              </View>
            </TouchableOpacity>
          )}

          {/* Next Button */}
          {currentImageIndex < images.length - 1 && (
            <TouchableOpacity
              style={{ position: 'absolute', right: 20, zIndex: 10 }}
              onPress={goToNextImage}
              className="w-12 h-12 bg-white/20 rounded-full items-center justify-center"
            >
              <View className="w-8 h-8 bg-white rounded-full items-center justify-center">
                <View className="w-4 h-4 bg-black rounded-full -rotate-45 transform origin-center" />
              </View>
            </TouchableOpacity>
          )}

          {/* Current Image */}
          {modalImage && (
            <Image
              source={{ uri: modalImage }}
              style={{ width: '90%', height: '60%', borderRadius: 16 }}
              resizeMode="contain"
            />
          )}

          {/* Image Counter */}
          <View className="absolute bottom-20 bg-black/50 px-4 py-2 rounded-full">
            <View className="flex-row items-center space-x-2">
              {images.map((_, idx) => (
                <View
                  key={idx}
                  className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ServiceImageGallery;
