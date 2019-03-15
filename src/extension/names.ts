import * as nodecgApiContext from './util/nodecg-api-context';
import {Names, NameObject} from '../types/schemas/names';
import {NameArgs} from '../types/nameArgs';

const nodecg = nodecgApiContext.get();
import clone = require('clone');
require('clone');

const names = nodecg.Replicant<Names>('names');

nodecg.listenFor('addStaff', add);
nodecg.listenFor('delStaff', del);
nodecg.listenFor('editStaff', edit);

// List mutation functions
/************************/

// Append item to the list
function add(args: NameArgs): void {
    const newList: Names = clone(names.value);
    const index = newList.index++;

    // ensure newList.items is an array
    newList.items = newList.items || [];

    newList.items.push({id: index, realName: args.realName, fullName: args.fullName, alias: args.alias, social: args.social});

    names.value = newList;
}

// Delete item from list
function del(id: number): void {
    // check id is not 0
    if (!id || id < 1) return;

    const newList = clone(names.value);

    // check at least one item exists
    if (!newList.items || newList.items.length < 1) return;

    const index = newList.items.findIndex(x => x.id === id);

    // check item with id exists
    if (index === undefined) return;

    delete newList.items[index];

    names.value = newList;
}

// Modify item in list
function edit(nameObj: NameObject): void {
    const newList = clone(names.value);
    newList.items[nameObj.id] = nameObj;

    names.value = newList;
}
