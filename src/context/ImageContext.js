import React, { createContext, useState, useContext } from 'react';

// Criação do contexto de imagens
export const ImageContext = createContext();

// Provedor do contexto de imagens
export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]); // Armazena as imagens no estado

  // Adiciona uma imagem à lista
  const addImage = (image) => {
    setImages((prevImages) => [...prevImages, image]);
  };

  // Remove uma imagem específica (usando ID ou índice)
  const removeImage = (imageId) => {
    setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
  };

  // Limpa todas as imagens
  const clearImages = () => {
    setImages([]);
  };

  return (
    <ImageContext.Provider value={{ images, setImages, addImage, removeImage, clearImages }}>
      {children}
    </ImageContext.Provider>
  );
};

// Hook personalizado para acessar o ImageContext
export const useImageContext = () => useContext(ImageContext);
