import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { images } from "@/constants";

const CustomButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity
      className={`border b-[#d3d3d3] bg-white py-3 px-4 flex justify-center items-center flex-row rounded-md ${style}`}
      onPress={onPress}
    >
        <Image source={images.addArrow} className=""/>
      <Text className={`text-[#1D4F95] text-center font-semibold ml-2 ${textStyle}`}>
        
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
