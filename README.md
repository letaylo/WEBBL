# WEBBL
Web Extension Behavioral Biometric Logger (includes basic key and mouse dynamics)

**Description:** Logs raw behavioral data pertaining to mouse and keystroke dynamics
**Requires:** Latest version of Firefox
**Output:** raw behavioral data (data.csv)

**Installation:**
  1.  Clone Repository to Local Machine (https://github.com/letaylo/WEBBL.git)
  2.  Open Firefox, type “about:debugging”  (without quotes) in the address bar and hit enter
  3.  In the upper right corner, press ‘Load Temporary Add-on.’ This should bring up an explorer window. Search for the repository, and select ‘manifest.json’ (doesn’t have to be this file, just any file in the repository). 
  4.  The logger is now active. The logger will record until a form submit is detected, which will prompt the user to download a file (data.csv). This file contains all the raw data needed to extract the various features from both mouse and key dynamics. Recommended to save to the WEBBL-A repository location (already added to the .gitignore).


**Overview:**

The logger itself is located within “WEBBL/content_scripts/weblogger.js”. The logger relies on two types of functions:
  1.  Logger functions
  2.  Write function

Logger functions are called whenever a specific basic event is hit; ie. mousedown, mouseup, keydown, keyup, etc.

![alt text](https://raw.githubusercontent.com/letaylo/WEBBL/master/README/logger_ex.PNG?token=AG5EVQJ5MAZVYFDFDAWZMUS4XXOQ4)

_Figure 1_

Figure 1 shows an example of a logger function. Each logger records the following data: xpos (of mouse coordinates, in pixels), ypos, timestamp (in ms), the event_type (mousedown/up, keydown/up, mousemove), and the key (left as a “:” for all mouse related events). In this particular case, the event_type is “mm”, signifying mousemove. This data is saved as a JSON string in local storage for later retrieval, with each value separated by commas and each entry separated by a newline (important for storing in the csv file).

The writer function is called whenever the “submit” function is detected in a form. For general testing, I used a google search to hit this event (only works if you use the enter key). In future implementations, this should fire on the “unload” event, which should download the data on any page redirect, but I could not get this to function. Note: Do not use “onbeforeunload” event listener, as this will prompt the user if they wish to stay on the page rather than actually log.

![alt text](https://raw.githubusercontent.com/letaylo/WEBBL/master/README/writer_ex.PNG?token=AG5EVQOXJH2D7O6SLVZGM6C4XXONM)

_Figure 2_

Figure 2 shows the writer function. It functions by retrieving data from local storage, and writing using the download function into “data.csv”.
