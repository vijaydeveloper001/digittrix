import { Image, Pressable, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

type Props = {
  image: any;
  style?: any;
  onPress?: () => void;
};

const RenderImage = ({ image, style, onPress, ...rest }: Props) => {
  const [isImage, setIsImage] = useState<boolean>(false);

  useEffect(() => {
    const checkImage = async () => {
      if (typeof image === 'string' && image) {
        try {
          const response = await fetch(image);
          const contentType = response.headers.get('content-type');
          setIsImage(contentType?.startsWith('image') ?? false);
        } catch (error) {
          console.error("Error fetching image: ", error);
          setIsImage(false);
        }
      } else if (image) {
        // For local images, assume it's an image
        setIsImage(true);
      } else {
        setIsImage(false);
      }
    };

    checkImage();
  }, [image]);

  if (!image) {
    return null;
  }

  return (
    <Pressable onPress={onPress}>
      {isImage ? (
        <Image
          source={typeof image === 'string' ? { uri: image } : image}
          style={[styles.imageStyle, style]}
          {...rest}
        />
      ) : null}
    </Pressable>
  );
};

export default RenderImage;

const styles = StyleSheet.create({
  imageStyle: {
    width: 24,
    height: 24,
  },
});
