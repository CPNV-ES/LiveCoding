#
# Regroups all commands for the Ruby version of the default game
#

class GameConsole
  def print(value)
    puts "console.log('#{value}');";
  end
end

#
# Character of the game
# Allows you to control its movements
#
class Pacman

  # Moves the character to the left of his position
  def moveLeft
    STDERR.puts "none"
    STDERR.flush

    puts "pacman.moveLeft();"
    STDOUT.flush
    msg = STDIN.gets
    puts msg

    msg
  end

  # Moves the character to the right of his position
  def moveRight
    STDERR.puts "none"
    STDERR.flush

    puts "pacman.moveRight();"
    STDOUT.flush
    msg = STDIN.gets
    puts msg

    msg
  end

  # Moves the character above his position
  def moveUp
    STDERR.puts "none"
    STDERR.flush

    puts "pacman.moveUp();"
    STDOUT.flush
    msg = STDIN.gets
    puts msg

    msg
  end

  # Moves the character below his position
  def moveDown
    STDERR.puts "none"
    STDERR.flush

    puts "pacman.moveDown();"
    STDOUT.flush
    msg = STDIN.gets
    puts msg

    msg
  end

end

# Check if the case on the left of the character is free
#
#   isLeftSideFree
#   # => true|false
#
def isLeftSideFree
  STDERR.puts "none"
  STDERR.flush

  puts 'isLeftSideFree();'
  STDOUT.flush
  msg = STDIN.gets
  puts msg

  msg
end

# Check if the case on the right of the character is free
#
#   isRightSideFree
#   # => true|false
#
def isRightSideFree
  STDERR.puts "none"
  STDERR.flush

  puts 'isRightSideFree();'
  STDOUT.flush
  msg = STDIN.gets
  puts msg

  msg
end

# Check if the case on the top of the character is free
#
#   isUpSideFree
#   # => true|false
#
def isUpSideFree
  STDERR.puts "none"
  STDERR.flush

  puts 'isUpSideFree();'
  STDOUT.flush
  msg = STDIN.gets
  puts msg

  msg
end

# Check if the case on the bottom of the character is free
#
#   isDownSideFree
#   # => true|false
#
def isDownSideFree
  STDERR.puts "none"
  STDERR.flush

  puts 'isDownSideFree();'
  STDOUT.flush
  msg = STDIN.gets
  puts msg

  msg
end
