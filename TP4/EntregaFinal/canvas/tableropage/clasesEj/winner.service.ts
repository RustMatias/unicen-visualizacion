import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class WinnerService {
  msg: string
  winner: number | undefined

  constructor() {
    this.msg = ''
  }

  /** Restart winner */
  reset(): void {
    this.winner = undefined
    this.msg = ''
  }

  /** Set player winner and msg based on quantity movements */
  setWinner(player: number, movimientos: number) {
    this.winner = player
    this.msg =
      'El jugador ' +
      player +
      ' gano el juego en ' +
      movimientos +
      ' movimientos!'
  }

  /** Set player winner based on player time out */
  setWinnerTime(player: number) {
    this.winner = player
    this.msg =
      'El jugador ' +
      player +
      ' gano el juego debido a que se termino el tiempo del otro jugador!'
  }
}
