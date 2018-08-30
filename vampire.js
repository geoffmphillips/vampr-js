class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let vampire = null;

    if (this.name === name) {
      vampire = this;
      return vampire;
    }

    for (const child of this.offspring) {
      vampire = child.vampireWithName(name);
      if (vampire) {
        return vampire;
      }
    }

    return vampire;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let descendents = 0;

    for (const child of this.offspring) {
      if (this.offspring !== []) {
        descendents++;
      }
      let totalOffspring = child.totalDescendents;
      descendents += totalOffspring;
    }
    return descendents
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennials = [];

    if (this.yearConverted > 1980) {
      millennials.push(this);
    }

    for (const child of this.offspring) {
      const millennialOffspring = child.allMillennialVampires;
      millennials = millennials.concat(millennialOffspring);
    }

    return millennials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let closestAncestor = null;
    if (this.creator === null || this === vampire || this === vampire.creator) {
      closestAncestor = this;
      return closestAncestor
    } else if (vampire.creator === null || vampire.creator === this) {
      closestAncestor = vampire;
      return closestAncestor
    } else if (this.creator === vampire.creator) {
      closestAncestor = this.creator;
      return closestAncestor
    } else if (vampire.creator !== null) {
      closestAncestor = this.closestCommonAncestor(vampire.creator);
      if (closestAncestor) {
        return closestAncestor;
      }
    } else {
      closestAncestor = this.creator.closestCommonAncestor(vampire);
      if (closestAncestor) {
        return closestAncestor;
      }
    }
    return closestAncestor;

  }
}

module.exports = Vampire;
