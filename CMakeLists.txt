cmake_minimum_required(VERSION 3.13)

if(ESP_PLATFORM)
  # Build LoRaSerialization as an ESP-IDF component
  # required because ESP-IDF runs cmake in script mode
  # and needs idf_component_register()
  file(GLOB_RECURSE LORA_SERIALIZATION_ESP_SOURCES
    "src/*.*"
  )

  idf_component_register(
    SRCS ${LORA_SERIALIZATION_ESP_SOURCES} 
    INCLUDE_DIRS . src 
  )

  return()
endif()

if(CMAKE_SCRIPT_MODE_FILE)
  message(FATAL_ERROR "Attempted to build LoRaSerialization in script mode")
endif()

project(radiolib)

file(GLOB_RECURSE LORA_SERIALIZATION_SOURCES
  "src/*.cpp"
)

add_library(LoRaSerialization ${LORA_SERIALIZATION_SOURCES})

target_include_directories(LoRaSerialization
    PUBLIC $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/src>
           $<INSTALL_INTERFACE:${CMAKE_INSTALL_INCLUDEDIR}>)

# use c++20 standard
set_property(TARGET LoRaSerialization PROPERTY CXX_STANDARD 20)

# enable most warnings
target_compile_options(LoRaSerialization PRIVATE -Wall -Wextra)

include(GNUInstallDirs)

install(TARGETS LoRaSerialization
  LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
  ARCHIVE DESTINATION ${CMAKE_INSTALL_LIBDIR}
)

install(DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/src/
  DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}/LoRaSerialization
  FILES_MATCHING PATTERN "*.h"
)
