## Auto Buy Enchanted Armorie

Do you want to use habitica auto buy enchanted armorie, but have free API slots at all times?
Here is something for you <3

[Original script](https://github.com/bumbleshoot/auto-cast-buffs)

This version runs every 15 mins and leave space for your other API scripts (like auto-accept quests script). Script chacks players's gold to determine how many times it should buy enchanted armorie.

## Setup Instructions
It is highly recommended that you use a desktop computer for this, as some of the steps don't work well on mobile. Make sure you read the [Before Installing](#before-installing) section above, and follow the instructions there if applicable!
1. Click [here](https://script.google.com/d/1oadVDz83W-dYTCryNnZ6O6HVEyOQMSaGoZi51TLm-vsSbzpj5wm5f5gN/edit?usp=sharing) to go to the Auto Buy Enchanted Armorie. If you're not already signed into your Google account, you will be asked to sign in.
2. In the main menu on the left, click on "Overview" (looks like a lowercase letter i inside a circle).
3. Click the "Make a copy" button (looks like two pages of paper).
4. At the top of your screen, click on "Copy of Auto Buy Enchanted Armorie". Rename it "Auto Buy Enchanted Armorie" and click the "Rename" button.
5. Click [here](https://habitica.com/user/settings/api) to open your API Settings. Highlight and copy your User ID (it looks something like this: `35c3fb6f-fb98-4bc3-b57a-ac01137d0847`). In the Auto Buy Enchanted Armorie script, paste your User ID between the quotations where it says `const USER_ID = "";`. It should now look something like this: `const USER_ID = "35c3fb6f-fb98-4bc3-b57a-ac01137d0847";`
6. On the same page where you copied your User ID, click the "Show API Token" button, and copy your API Token. In the Auto Buy Enchanted Armorie script, paste your API Token between the quotations where it says `const API_TOKEN = "";`. It should now look something like this: `const API_TOKEN = "35c3fb6f-fb98-4bc3-b57a-ac01137d0847";`
7. Update `RESERVE_GOLD` to the amount of gold you want left over after the script buys your Enchanted Armorie for you. Only edit the number in between the `=` and the `;`.
8. You can adjuct `API_CALLS_LEFT` to the number of API calls, that you want left over for other scripts. Only edit the number in between the `=` and the `;`.
9. Click the "Save project" button near the top of the page (looks like a floppy disk).
10. Click the drop-down menu to the right of the "Debug" button, near the top of the page. Select "install" from the drop-down.
11. Click the "Run" button to the left of the "Debug" button. Wait for it to say "Execution completed".


You're all done! If you need to change the settings or uninstall the script at some point, follow the steps below.  

## Changing the Settings
It is highly recommended that you use a desktop computer for this, as some of the steps don't work well on mobile.
1. [Click here](https://script.google.com/home) to see a list of your scripts. If you're not already signed into your Google account, click the "Start Scripting" button and sign in.  Then click on "My Projects" in the main menu on the left.
2. Click on "Auto Buy Enchanted Armorie".
3. Update `RESERVE_GOLD` to the amount of gold you want left over after the script buys your Enchanted Armorie for you. Only edit the number in between the `=` and the `;`.
4. Adjuct `API_CALLS_LEFT` to the number of API calls, that you want left over for other scripts. Only edit the number in between the `=` and the `;`.
5. Click the "Save project" button near the top of the page (looks like a floppy disk).

## Uninstalling the Script
It is highly recommended that you use a desktop computer for this, as some of the steps don't work well on mobile.
1. [Click here](https://script.google.com/home) to see a list of your scripts. If you're not already signed into your Google account, click the "Start Scripting" button and sign in.  Then click on "My Projects" in the main menu on the left.
2. Click on "Auto Buy Enchanted Armorie".
3. Click the drop-down menu to the right of the "Debug" button, near the top of the page. Select "uninstall" from the drop-down.
4. Click the "Run" button to the left of the "Debug" button. Wait for it to say "Execution completed".

## Updating the Script
It is highly recommended that you use a desktop computer for this, as some of the steps don't work well on mobile.
1. Follow the steps in [Uninstalling the Script](#uninstalling-the-script) above.
2. Copy & paste your settings (`const`s) into a text editor so you can reference them while setting up the new version.
3. In the main menu on the left, click on "Overview" (looks like a lowercase letter i inside a circle).
4. Click the "Remove project" button (looks like a trash can).
5. Follow the [Setup Instructions](#setup-instructions) above.
 

original script & tutorial by [@bumbleshoot](https://github.com/bumbleshoot/auto-cast-buffs#setup-instructions)
