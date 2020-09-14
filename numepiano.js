const NumePiano = (() => {
  const PIANO = Synth.createInstrument('piano');
  const NUME_MAP = {
    Do: {
      line2: [{ note: 'E', octive: 0 }, { note: 'F', octive: 0 }, { note: 'G', octive: 0 }, { note: 'A', octive: 0 }, { note: 'B', octive: 0 }, { note: 'C', octive: 1 }, { note: 'D', octive: 1 }, { note: 'E', octive: 1 }, { note: 'F', octive: 1 }, { note: 'G', octive: 1 }, { note: 'A', octive: 1 }, { note: 'B', octive: 1 }, { note: 'C', octive: 2 }],
      line3: [{ note: 'C', octive: 0 }, { note: 'D', octive: 0 }, { note: 'E', octive: 0 }, { note: 'F', octive: 0 }, { note: 'G', octive: 0 }, { note: 'A', octive: 0 }, { note: 'B', octive: 0 }, { note: 'C', octive: 1 }, { note: 'D', octive: 1 }, { note: 'E', octive: 1 }, { note: 'F', octive: 1 }, { note: 'G', octive: 1 }, { note: 'A', octive: 1 }],
      line4: [{ note: 'A', octive: -1 }, { note: 'B', octive: -1 }, { note: 'C', octive: 0 }, { note: 'D', octive: 0 }, { note: 'E', octive: 0 }, { note: 'F', octive: 0 }, { note: 'G', octive: 0 }, { note: 'A', octive: 0 }, { note: 'B', octive: 0 }, { note: 'C', octive: 1 }, { note: 'D', octive: 1 }, { note: 'E', octive: 1 }, { note: 'F', octive: 1 }]
    },
    Fa: {
      line2: [{ note: 'A', octive: -1 }, { note: 'B', octive: -1 }, { note: 'C', octive: 0 }, { note: 'D', octive: 0 }, { note: 'E', octive: 0 }, { note: 'F', octive: 0 }, { note: 'G', octive: 0 }, { note: 'A', octive: 0 }, { note: 'B', octive: 0 }, { note: 'C', octive: 1 }, { note: 'D', octive: 1 }, { note: 'E', octive: 1 }, { note: 'F', octive: 1 }],
      line3: [{ note: 'F', octive: 0 }, { note: 'G', octive: 0 }, { note: 'A', octive: 0 }, { note: 'B', octive: 0 }, { note: 'C', octive: 1 }, { note: 'D', octive: 1 }, { note: 'E', octive: 1 }, { note: 'F', octive: 1 }, { note: 'G', octive: 1 }, { note: 'A', octive: 1 }, { note: 'B', octive: 1 }, { note: 'C', octive: 2 }, { note: 'D', octive: 2 }],
      line4: [{ note: 'D', octive: 0 }, { note: 'E', octive: 0 }, { note: 'F', octive: 0 }, { note: 'G', octive: 0 }, { note: 'A', octive: 0 }, { note: 'B', octive: 0 }, { note: 'C', octive: 1 }, { note: 'D', octive: 1 }, { note: 'E', octive: 1 }, { note: 'F', octive: 1 }, { note: 'G', octive: 1 }, { note: 'A', octive: 1 }, { note: 'B', octive: 1 }]
    }
  };
  const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const DEFAULT_OCTAVE = 4;

  function registerClickListeners() {
    const numeButtons = document.querySelectorAll('input[type="image"]');
    const transposeAmount = document.getElementById('transpose');

    for (let i = 0; i < numeButtons.length; i++) {
      numeButtons[i].addEventListener('click', () => {
        const isDoClef = document.querySelector('input[name="clef"]:checked').value === 'do';
        const line = document.querySelector('input[name="line"]:checked').value;
        document.getElementById('notePlayed').textContent = playNume(numeButtons[i].value, isDoClef, line, parseInt(transposeAmount.value));
      });

    }
    document.getElementById('transposeUp').addEventListener('click', () => transposeAmount.value = parseInt(transposeAmount.value) + 1);
    document.getElementById('transposeDown').addEventListener('click', () => transposeAmount.value = parseInt(transposeAmount.value) - 1);
  }

  function transpose(note, amount) {
    const noteIndex = NOTES.indexOf(note);
    if (noteIndex < 0) {
      throw `Cannot transpose ${note}, does not exist!`;
    }

    const octaveAdjustment = Math.floor((noteIndex + amount) / NOTES.length);
    const newIndex = (noteIndex + amount) % NOTES.length;
    return [NOTES[newIndex], octaveAdjustment];
  }

  function playNume(nume, isDoClef, line, transposeAmount = 0) {
    if (nume < 0 || nume > 12) {
      throw "Invalid 'nume' argument: value must be between 0 and 12 inclusive!";
    }
    if (line < 2 || line > 4) {
      throw "Invalid 'line' argument: value must be 2, 3, or 4!";
    }
    transposeAmount = Math.floor(transposeAmount);

    const note = (isDoClef ? NUME_MAP.Do : NUME_MAP.Fa)['line' + line][nume];
    const [transposedNote, octaveAdjustment] = transpose(note.note, transposeAmount);
    PIANO.play(transposedNote, DEFAULT_OCTAVE + octaveAdjustment + note.octive, 2);
    return transposedNote;
  }

  if (document.readyState != 'loading') {
    registerClickListeners();
  } else {
    document.addEventListener('DOMContentLoaded', registerClickListeners);
  }
})();