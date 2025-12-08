export type TMapper<TEntity, TDto> = {
  entityToDto(entity: TEntity): TDto;
  dtoToEntity(dto: TDto): TEntity;
};
