# Intel: Rolling Stone

## Processes
Processes to create image sequences.

### Extract JPEG sequence from MP4 using `ffmpeg`
ffmpeg -qscale 1 -i path/to/video.mp4 -an -s 480x270 -f image2 -qscale 1 path/to/directory/name_%03d.jpg
ffmpeg -qscale 1 -i path/to/video.mp4 -an -s 704x396 -f image2 -qscale 1 path/to/directory/name_%03d.jpg

### Make Progressive JPEGs using `jpegtran`
find path/to/directory -name "*.jpg" -type f -exec jpegtran -copy none -progressive -outfile {} {} \;