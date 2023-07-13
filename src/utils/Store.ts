import createStore, { State } from 'react-rxjs-state-management';

const counterHandler: State<number | null> = {
  name: 'modalId',
  defaultState: null,
  setter: function (state, payload: number | null) {
    return payload;
  },
};

export default createStore([counterHandler]);
