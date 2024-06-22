import {
  MutationOptions,
  QueryClient,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

export const queryClient = new QueryClient();

export class Query<A extends any[], T> {
  constructor(
    private _options: UseQueryOptions<T> | ((...args: A) => UseQueryOptions<T>),
    private readonly _params?: A
  ) {}

  options(options: typeof this._options) {
    let newOptions: typeof this._options;

    if (typeof this._options === "object" && typeof options === "object") {
      newOptions = {
        ...this._options,
        ...options,
      };
    } else {
      newOptions = (...args) => {
        return {
          ...(typeof this._options === "function"
            ? this._options(...args)
            : this._options),
          ...(typeof options === "function" ? options(...args) : options),
        };
      };

      return new Query<A, T>(newOptions, this._params);
    }
  }

  params(...params: A) {
    return new Query<A, T>(this._options, params);
  }

  private get query() {
    if (typeof this._options === "function") {
      if (!this._params) {
        throw new Error("Must specify query params!");
      }

      return this._options(...this._params);
    }

    return this._options;
  }

  use() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery(this.query);
  }

  fetch() {
    return queryClient.fetchQuery(this.query);
  }

  invalidate() {
    return queryClient.invalidateQueries(this.query);
  }
}

export class Mutation<A, T> {
  constructor(private readonly _options: MutationOptions<T, Error, A>) {}

  options(options: typeof this._options) {
    return new Mutation<A, T>({
      ...this._options,
      ...options,
    });
  }

  use() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation(this._options);
  }
}

export const createQuery = <A extends any[], T>(
  options: Query<A, T>["_options"]
) => {
  return new Query<A, T>(options);
};

export const createMutation = <A, T>(options: Mutation<A, T>["_options"]) => {
  return new Mutation<A, T>(options);
};
