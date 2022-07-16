oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g jminesweeper
$ jminesweeper COMMAND
running command...
$ jminesweeper (--version)
jminesweeper/0.0.0 darwin-arm64 node-v16.14.2
$ jminesweeper --help [COMMAND]
USAGE
  $ jminesweeper COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`jminesweeper hello PERSON`](#jminesweeper-hello-person)
* [`jminesweeper hello world`](#jminesweeper-hello-world)
* [`jminesweeper help [COMMAND]`](#jminesweeper-help-command)
* [`jminesweeper plugins`](#jminesweeper-plugins)
* [`jminesweeper plugins:install PLUGIN...`](#jminesweeper-pluginsinstall-plugin)
* [`jminesweeper plugins:inspect PLUGIN...`](#jminesweeper-pluginsinspect-plugin)
* [`jminesweeper plugins:install PLUGIN...`](#jminesweeper-pluginsinstall-plugin-1)
* [`jminesweeper plugins:link PLUGIN`](#jminesweeper-pluginslink-plugin)
* [`jminesweeper plugins:uninstall PLUGIN...`](#jminesweeper-pluginsuninstall-plugin)
* [`jminesweeper plugins:uninstall PLUGIN...`](#jminesweeper-pluginsuninstall-plugin-1)
* [`jminesweeper plugins:uninstall PLUGIN...`](#jminesweeper-pluginsuninstall-plugin-2)
* [`jminesweeper plugins update`](#jminesweeper-plugins-update)

## `jminesweeper hello PERSON`

Say hello

```
USAGE
  $ jminesweeper hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/jacruzca/jminesweeper/blob/v0.0.0/dist/commands/hello/index.ts)_

## `jminesweeper hello world`

Say hello world

```
USAGE
  $ jminesweeper hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `jminesweeper help [COMMAND]`

Display help for jminesweeper.

```
USAGE
  $ jminesweeper help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for jminesweeper.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `jminesweeper plugins`

List installed plugins.

```
USAGE
  $ jminesweeper plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ jminesweeper plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `jminesweeper plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ jminesweeper plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ jminesweeper plugins add

EXAMPLES
  $ jminesweeper plugins:install myplugin 

  $ jminesweeper plugins:install https://github.com/someuser/someplugin

  $ jminesweeper plugins:install someuser/someplugin
```

## `jminesweeper plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ jminesweeper plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ jminesweeper plugins:inspect myplugin
```

## `jminesweeper plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ jminesweeper plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ jminesweeper plugins add

EXAMPLES
  $ jminesweeper plugins:install myplugin 

  $ jminesweeper plugins:install https://github.com/someuser/someplugin

  $ jminesweeper plugins:install someuser/someplugin
```

## `jminesweeper plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ jminesweeper plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ jminesweeper plugins:link myplugin
```

## `jminesweeper plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ jminesweeper plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ jminesweeper plugins unlink
  $ jminesweeper plugins remove
```

## `jminesweeper plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ jminesweeper plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ jminesweeper plugins unlink
  $ jminesweeper plugins remove
```

## `jminesweeper plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ jminesweeper plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ jminesweeper plugins unlink
  $ jminesweeper plugins remove
```

## `jminesweeper plugins update`

Update installed plugins.

```
USAGE
  $ jminesweeper plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
