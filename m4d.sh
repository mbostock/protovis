#/bin/bash

echo ".INTERMEDIATE $1" | sed s/.m4$/.html': \\'/
grep < $1 ^include | sed s\|include\(\`\\\(.*\\\)\'\)\|`dirname $1`\\/\\1' \\'\|g
