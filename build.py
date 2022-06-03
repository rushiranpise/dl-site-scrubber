#! /usr/bin/python3

SOURCE_SCRIPT_PATH = './src/SiteScrubber.js'
SOURCE_SCRIPT_DATA = open(SOURCE_SCRIPT_PATH, 'r').read()

DIST_META_PATHS = ['./dist/SiteScrubber.meta.js',
                   './dist/SiteScrubber-AiO.meta.js', './scripts/SiteScrubber-AiO.meta.js']
DIST_SCRIPT_PATHS = ['./dist/SiteScrubber.user.js',
                     './dist/SiteScrubber-AiO.user.js', './scripts/SiteScrubber-AiO.user.js']


def get_new_meta_data(data):
    output_text = ""
    for line in data.splitlines():
        if line.startswith("//"):
            output_text += line + "\n"
        else:
            break
    return output_text


def write_to_file(data, file_path):
    with open(file_path, 'w') as g:
        g.write(data)


def main():
    new_meta_data = get_new_meta_data(SOURCE_SCRIPT_DATA)
    for path in DIST_META_PATHS:
        write_to_file(new_meta_data, path)
    for path in DIST_SCRIPT_PATHS:
        write_to_file(SOURCE_SCRIPT_DATA, path)
    return 0


if __name__ == '__main__':
    main()
