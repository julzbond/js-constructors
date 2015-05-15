/**
 * Creates a generic spell that can be cast.
 *
 * @name Spell
 * @param {string} name         The name of the spell.
 * @param {number} cost         The amount needed to cast this spell.
 * @param {string} description  A short description of the spell.
 * @property {string} name
 * @property {number} cost
 * @property {string} description
 */

  /**
   * Print out all spell details and format it nicely.
   * The format doesnt matter, as long as it contains the spell name, cost, and description.
   *
   * @name printDetails
   *
   * note: using comma separated arguments for console.log() will not satisfy the tests
   * e.g. console.log(a, b, c); <-- no commas, please use string concatenation.
   */

function Spell (name, cost, description) {
  this.name = name;
  this.cost = cost;
  this.description = description;
  this.printDetails = function(){
    console.log("name: " + this.name + ", " + "cost: " + this.cost + ", " + "description: " + this.description);
  };
  return this;
}

/**
 * A spell that deals damage.
 * We want to keep this code DRY (Don't Repeat Yourself).
 *
 * So you should use `Spell.call()` to assign the spell name, cost, and description.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
 *
 * In addition, you will also want to assign `DamageSpell.prototype`
 * a value so that it inherits from `Spell`.
 * Make sure to call this OUTSIDE of the function declaration.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype
 *
 * @name DamageSpell
 * @param {string} name         The name of the spell.
 * @param {number} cost         The amount needed to cast this spell.
 * @param {number} damage       The amount of damage this spell deals.
 * @param {string} description  A short description of the spell.
 * @property {string} name
 * @property {number} cost
 * @property {number} damage
 * @property {string} description
 */

function DamageSpell (name, cost, damage, description){
  Spell.call(this, name, cost, description);
  this.damage = damage;
 }

DamageSpell.prototype = Object.create(Spell.prototype);

/**
 * Now that you've created some spells, let's create
 * `Spellcaster` objects that can use them!
 *
 * @name Spellcaster
 * @param {string} name         The spellcaster's name.
 * @param {number} health       The spellcaster's health points.
 * @param {number} mana         The spellcaster's mana points, used for casting spells.
 * @property {string} name
 * @property {number} health
 * @property {mana} mana
 * @property {boolean} isAlive  Default value should be `true`.
 */

function Spellcaster (name, health, mana){
  this.name = name;
  this.health = health;
  this.mana = mana;
  this.isAlive = true;

  /**
   * The spellcaster loses health equal to `damage`.
   * Health should never be negative.
   * If the spellcaster's health drops to 0,
   * its `isAlive` property should be set to `false`.
   *
   * @name inflictDamage
   * @param  {number} damage  Amount of damage to deal to the spellcaster
   */

  this.inflictDamage = function (damage){
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
    }
  }

  /**
   * Reduces the spellcaster's mana by `cost`.
   * Mana should only be reduced only if there is enough mana to spend.
   *
   * @name spendMana
   * @param  {number} cost      The amount of mana to spend.
   * @return {boolean} success  Whether mana was successfully spent.
   */

   this.spendMana = function (cost){
    var success = false;
    if (cost <= this.mana){
      this.mana -= cost;
      success = true;
    }
    return success;
   }
  /**
   * Allows the spellcaster to cast spells.
   * The first parameter should either be a `Spell` or `DamageSpell`.
   * If it is a `DamageSpell`, the second parameter should be a `Spellcaster`.
   * The function should return `false` if the above conditions are not satisfied.
   *
   * You should use `instanceof` to check for these conditions.
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
   *
   * Next check if the spellcaster has enough mana to cast the spell.
   * If it can cast a spell, it should lose mana  equal to the spell's cost.
   * If there is not enough mana, return `false`.
   *
   * If there is enough mana to cast the spell, return `true`.
   * In addition, if it is a `DamageSpell` reduce the target's health by the spell's damage value.
   *
   * Use functions you've previously created: (`inflictDamage`, `spendMana`)
   * to help you with this.
   *
   * @name invoke
   * @param  {(Spell|DamageSpell)} spell  The spell to be cast.
   * @param  {Spellcaster} target         The spell target to be inflicted.
   * @return {boolean}                    Whether the spell was successfully cast.
   */

   this.invoke = function (spell, target){
    if (!(spell instanceof Spell) || this.mana < spell.cost || (spell instanceof DamageSpell && !target)) {
      return false;
    }
    if (target instanceof Spellcaster) {
      target.inflictDamage(spell.damage);
    }
    return this.spendMana(spell.cost);
   }
}