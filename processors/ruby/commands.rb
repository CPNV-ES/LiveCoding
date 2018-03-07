class GameConsole
  def print(value)
    puts "console.log('#{value}');";
  end
end

console = GameConsole.new


class Pacman
  def moveLeft
    STDERR.puts "none"
    STDERR.flush

    puts "pacman.moveLeft();"
    STDOUT.flush
    msg = STDIN.gets
    puts msg

    msg
  end

  def moveRight
    STDERR.puts "none"
    STDERR.flush

    puts "pacman.moveRight();"
    STDOUT.flush
    msg = STDIN.gets
    puts msg

    msg
  end

  def moveUp
    STDERR.puts "none"
    STDERR.flush

    puts "pacman.moveUp();"
    STDOUT.flush
    msg = STDIN.gets
    puts msg

    msg
  end

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


def isLeftSideFree
  STDERR.puts "none"
  STDERR.flush

  puts 'isLeftSideFree();'
  STDOUT.flush
  msg = STDIN.gets
  puts msg

  msg
end

def isRightSideFree
  STDERR.puts "none"
  STDERR.flush

  puts 'isRightSideFree();'
  STDOUT.flush
  msg = STDIN.gets
  puts msg

  msg
end

def isUpSideFree
  STDERR.puts "none"
  STDERR.flush

  puts 'isUpSideFree();'
  STDOUT.flush
  msg = STDIN.gets
  puts msg

  msg
end

def isDownSideFree
  STDERR.puts "none"
  STDERR.flush

  puts 'isDownSideFree();'
  STDOUT.flush
  msg = STDIN.gets
  puts msg

  msg
end
