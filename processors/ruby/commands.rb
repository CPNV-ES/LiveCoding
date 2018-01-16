class GameConsole
  def print(value)
    puts "console.log('#{value}');";
  end
end

console = GameConsole.new


class Pacman
  def moveLeft
    puts 'pacman.moveLeft();'
  end

  def moveRight
    puts 'pacman.moveRight();'
  end

  def moveUp
    puts 'pacman.moveUp();'
  end

  def moveDown
    puts 'pacman.moveDown();'
  end
end

pacman = Pacman.new


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
