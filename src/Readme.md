# File manager Node.js

## The program is started by npm-script start in following way: `npm run start -- --username=your_username`

## After program work finished: `ctrl + c` pressed or user sent `.exit` command into console

## At the start and after each operation : `You are currently in path_to_working_directory` should be printed

> `path_to_destination` directory can be relative or absolute
>
> `path_to_directory` can be relative or absolute
>
> `path_to_file` can be relative or absolute

### Navigation & working directory

`up` Go upper from current directory

`cd path_to_directory` Go to dedicated folder from current directory

`ls` Print in console list of all files and folders in current directory.

### Basic operations with files

`cat path_to_file` Read file and print it's content.

`add new_file_name` Create empty file.

`rn path_to_file new_filename` Rename file.

`cp path_to_file path_to_new_directory` Copy file.

`mv path_to_file path_to_new_directory` Move file.

`rm path_to_file` Delete file.

### Operating system info (prints following information in console)

`os --EOL` Get EOL and print it to console.

`os --cpus` Get host machine CPUs info and print it to console.

`os --homedir` Get home directory and print it to console.

`os --username` Get current system user name and print it to console.

`os --architecture` Get CPU architecture for which Node.js binary has compiled and print it to console.

### Hash calculation

`hash path_to_file`Calculate hash for file and print it into console.

### Compress and decompress operations

`compress path_to_file path_to_destination` Compress file (using Brotli algorithm).

`decompress path_to_file path_to_destination` Decompress file (using Brotli algorithm).

<details>
  
## Example of commands for testing:
npm run start -- --username=your_username

`cd C:\Users\yourMainFolder`

create new folder "test" for testing in your "yourMainFolder" or use some other folder for testing

`ls` - you should see all files\folders in your current folder

`cd C:\Users\yourMainFolder\test` or `cd test` or `cd .\test`

`up` - you should be in C:\Users\yourMainFolder

`add test\newfile.txt` - and write something in this file for next command

`cat test\newfile.txt` - you should see info from this file

`rn test\newfile.txt newfile-rename.txt`

create new folder "test2" in folder "test" for checking the next command

`cp test\newfile-rename.txt test\test2`

`rm test\test2\newfile-rename.txt`

`mv test\newfile-rename.txt test\test2`

`os --EOL`

`os --cpus`

`os --homedir`

`os --username`

`os --architecture`

`hash test\test2\newfile-rename.txt`

`compress test\test2\newfile-rename.txt test\test2`

`decompress test\test2\newfile-rename.txt test`
