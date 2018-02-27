class GameConsole
  def print(value)
    puts "console.log('#{value}');";
  end
end

console = GameConsole.new


class Pacman
  def moveLeft
    puts "pacman.moveLeft();"
    STDOUT.flush
    msg = STDIN.gets
    puts msg
  end

  def moveRight
    puts "pacman.moveRight();"
    STDOUT.flush
    msg = STDIN.gets
    puts msg
  end

  def moveUp
    puts "pacman.moveUp();"
    STDOUT.flush
    msg = STDIN.gets
    puts msg
  end

  def moveDown
    puts "pacman.moveDown();"
    STDOUT.flush
    msg = STDIN.gets
    puts msg
  end
end


def isLeftSideFree
  puts 'isLeftSideFree();'
end

def isRightSideFree
  puts 'isRightSideFree();'
end

def isUpSideFree
  puts 'isUpSideFree();'
end

def isDownSideFree
  puts 'isDownSideFree();'
end
