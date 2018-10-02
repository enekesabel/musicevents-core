export interface ISerializable<O extends { id: string }> {
  serialize(): O;

  id: string;
}
