import { container } from 'src/core/ioc/container/container';
import { interfaces } from 'inversify';

export default function useInjection<T>(
  identifier: interfaces.ServiceIdentifier<T>,
): T {
  return container.get<T>(identifier);
}
