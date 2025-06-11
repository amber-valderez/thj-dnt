# DNT Bank Output

This repo contains a simple web app to read the the raw output `.txt` files and then post it to https://thj-dnt.web.app/bank.

We currently have 4 banker characters:
1. Dntbank
2. Dntaugs
3. Dntepics
4. Dntspells

More info on what goes where is posted on the DNT Discord server in the **#bank-and-requests** channel.

## Create Output Files

1. Open your THJ dir, create a new dir called `outputs`
2. Login to the banker account, type `!banker` in **#officer-chat** to get the credentials.
3. Login to the `Dntbank` character.
4. Run the command `/output inventory outputs/Dntbank-Inventory.txt` # this filename must match exactly
5. Rinse and repeat for each character, make sure to name the file appropriately.

Once you have the 4 files you'll need to upload them.

## Update The Bank
1. Visit https://thj-dnt.web.app/upload.
2. Drag and drop all the files you want to update. There is no loading or progress.
3. If the file does not match the accepted Bank Character, an error will be logged and the file will be ignored.
4. Return to https://thj-dnt.web.app/bank and see the updates.
5. Profit.

## Improvements
* Move the files to S3 or GDrive, have GitHub Actions poll for changes every 5 minutes
