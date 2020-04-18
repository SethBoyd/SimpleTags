[![codecov](https://codecov.io/gh/HYPHENATE/SimpleTags/branch/master/graph/badge.svg)](https://codecov.io/gh/HYPHENATE/SimpleTags)
[![HYPHENATE](https://circleci.com/gh/HYPHENATE/SimpleTags.svg?style=svg&&circle-token=297c83f424a06b21dc3b4fa042318223464f67d7)](https://circleci.com/gh/HYPHENATE/SimpleTags)

# Simple Tags
A very simple solution to providing tagging that is reportable in Salesforce. Since the switch to Lightning the easy ability to take a record without using Topics in chatter and then report on them has been limited. This simple application fills that gap. We see this requirement come up a lot in the Nonprofit world the need to tag a grant based on theme, category, location and potentially funder. This can be acheived with dependent multi-select picklists but as we all know reporting on them is a pain.

## Verion Control

### 1.0 - Initial release
- Basic Tag Handling
- Configure the Tag Record relationship via custom meta data
- Dedicated permissions for different people
- Example report for tags on Account object

## Part 1: Installation

<a href="https://githubsfdeploy.herokuapp.com?owner=HYPHENATE&repo=SimpleTags">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

1. Ensure my domain is actived and deployed
2. Ensure path is activated
3. Install using the deploy to salesforce link
4. Start configuration

## Part 2: Configuration

1. Go to Account Lightning Page
2. Add tagComponent to the Page
3. Create a Tag
4. Visit an account search for the Tag you added
5. Select the tag
6. Expand to other objects follow this video (insert video link here)

## Part 3: Limitations
- A Tag Link can only be related to a max of 38 different Standard or Custom Objects
- No audit trail if a tag is removed unless you have a backup in place

## Credits

