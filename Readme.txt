Frontend -
 Flutter
    - Graphql for Auth,Profile part
    - Thirt party Api used - https://courses.edx.org/api/courses/v1/courses/
      (may have some delay due do api latency)
    - third party Api is REST 
    - code is in lmsapp.zip
    
Backend 
      - Nodejs 
      - Express
      - Appolo
      - GraphQl
      - hosted in https://taskserver-squadra.onrender.com/graphql.
         (free tier redner so may have latency upsto 50s on calling first time after inactivity)   
      -password reset link server side    
      - code is in backend folder

setup

Run apk for android devices attached in the mail



flutter development setup

1. Install Flutter

Make sure you have Flutter installed on your system. If not, you can install it by following the Flutter installation guide.
For macOS/Linux/Windows:

Download the latest stable version of Flutter SDK from the Flutter website.
Extract the zip file to an appropriate location, and add the Flutter directory to your system's PATH.

2. Verify Flutter Installation
Open a terminal/command prompt and run the following command to verify that Flutter is correctly installed:
bash

flutter doctor
This will check your environment and display a report of the status of your installation. Make sure there are no issues with dependencies.

3. Install Dependencies (if required)
Navigate to your Flutter project directory in the terminal.
Run the following command to install any missing dependencies:
bash

flutter pub get

4. Configure Your Device/Emulator
For Android:
Make sure you have Android Studio installed. You can download it from here.
Set up an Android Virtual Device (AVD) or connect a physical Android device.
Run flutter devices to see if your device is detected.
For iOS (macOS only):
You need Xcode installed. Install it from the Mac App Store.
Set up an iOS simulator or connect a physical iPhone.
Run flutter devices to check if the device is detected.

5. Run the Project
With the device/emulator running, execute the following command to launch your app:
bash

flutter run
