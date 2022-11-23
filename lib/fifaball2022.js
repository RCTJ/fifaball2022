'use babel';

import Fifaball2022View from './fifaball2022-view';
import { CompositeDisposable } from 'atom';

export default {

  fifaball2022View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.fifaball2022View = new Fifaball2022View(state.fifaball2022ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.fifaball2022View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fifaball2022:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.fifaball2022View.destroy();
  },

  serialize() {
    return {
      fifaball2022ViewState: this.fifaball2022View.serialize()
    };
  },

  toggle() {
    console.log('Fifaball2022 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
