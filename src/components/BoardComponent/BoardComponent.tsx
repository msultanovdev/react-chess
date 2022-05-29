import React, { FC, useEffect, useState } from 'react';
import CellComponent from '../CellComponent/CellComponent';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    const click = (cell: Cell) => {
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
            updateBoard();
        } else {
            setSelectedCell(cell);
        }
    }
    
    useEffect(() => {
        hightLightCells();
    }, [selectedCell]);

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    const hightLightCells = () => {
        board.highlightCells(selectedCell);
        updateBoard();
    }

  return (
    <div
        className="board"
    >
        {
            board.cells.map((row, index) => 
                <React.Fragment key={index}>
                    {
                        row.map(cell => 
                            <CellComponent 
                                click={click}
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />    
                        )
                    }
                </React.Fragment>
            )
        }
    </div>
  );
};

export default BoardComponent;