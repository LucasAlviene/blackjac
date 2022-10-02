import React, { useEffect } from 'react';
import { useSelector, useDispatch } from '../store/Root.store';
import { addPlayer, addHand, removePlayer, sumHand } from '../store/Players.store';

import { onEvent, offEvent } from '../utils/event';

interface RoomProps {
}

const Room: React.FC<RoomProps> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const listener = (e, data: ResponseServer) => {
      switch (data.command) {
        case "STAND":
          // Próximo jogador
          // [id]
          // Ex: [1]
          break;
        case "HAND":
          // Mão dos jogadores
          // [id do jogador,cartas]
          // Ex:  [1, "xx_xx_xx|xx_xx_xx"]
          if (data.body) {
            const [idPlayer, cardInfo, sumCards] = data.body;
            const listCards = cardInfo.split("|");
            for (const card of listCards) {
              const [id, color, suit, number] = card.split("_");
              dispatch(addHand({ id: Number(id), color: color as CardColor, suit: suit as CardSuit, number: number as CardNumber, idPlayer: Number(idPlayer) }));
              dispatch(sumHand({ sumCards: Number(sumCards), idPlayer: Number(idPlayer) }));
            }
          }
          break;
        case "DRAW":
          // Jogdor que irá comprar uma carta
          // [id,hand,sumHand]
          // Ex: [1,"xx_xx_xx|xx_xx_xx",20]
          if (data.body) {
            const [idPlayer, cardInfo, sumCards] = data.body;
            const listCards = cardInfo.split("|");
            for (const card of listCards) {
              const [id, color, suit, number] = card.split("_");
              dispatch(addHand({ id: Number(id), color: color as CardColor, suit: suit as CardSuit, number: number as CardNumber, idPlayer: Number(idPlayer) }));
              dispatch(sumHand({ sumCards: Number(sumCards), idPlayer: Number(idPlayer) }));
            }
          }
          break;
        case "EXIT":
          if (data.body) {
            const [id] = data.body;
            dispatch(removePlayer(Number(id)));
          }
          break;
        case "WIN":
          // Jogdor que ganhou
          // [id]
          // Ex: [1]
          break;
        case "LOST":
          // Jogdor que perdeu
          // [id]
          // Ex: [1]
          break;
      }
    };
    onEvent("eventServer", listener)

    return () => offEvent("eventServer", listener);
  }, []);


  return (
    <div className='page page-room'>
      {/* oponentes */}
      <div>

      </div>
      {/* mensagem */}
      <div>

      </div>
      {/* cartas do usuario */}
      <div>

      </div>
      {/* usuário */}
      <div>
        {/* informações */}
        <div>

        </div>
        {/* ações */}
        <div>

        </div>
      </div>
    </div>
  );
};

export default Room;