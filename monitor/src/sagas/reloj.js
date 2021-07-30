import moment from 'moment'
import { take, put, fork, cancel, delay } from 'redux-saga/effects'

import {
  TICK,
  INICIAR_RELOJ,
  DETENER_RELOJ
} from '../constants/action_types'

function *tick() {
  while(true) {
    const currentMinute = moment()

    yield put({
      type: TICK,
      payload: currentMinute
    })

    yield delay((60 - currentMinute.seconds()) * 1000)
  }
}

export function *watchStatusReloj () {
  while (yield take(INICIAR_RELOJ)) {
    const bgSyncTask = yield fork(tick)

    yield take(DETENER_RELOJ)

    yield cancel(bgSyncTask)
  }
}
