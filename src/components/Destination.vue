<template lang="pug">
  form.destination
    legend.destination__legend Адрес доставки
    div(data-prop="city").destination__input-box
      Input(name="c" label="Город" v-model="addressItem.city" :rules="['required']")

    div(data-prop="district").destination__input-box
      Input(name="district" v-model="addressItem.district" label="Область")

    div(data-prop="street").destination__input-box
      Input(name="s" v-model="addressItem.street" label="Улица" :rules="['required']")

    div(data-prop="house").destination__input-box.destination__input-box--half
      Input(name="building" v-model="addressItem.house" label="Дом")
    //
    //.destination__input-box.destination__input-box--half
    //  Input(name="part" v-model="addressItem.part" label="Корпус")
    //
    //.destination__input-box.destination__input-box--half
    //  Input(name="building" v-model="addressItem.building" label="Строение")

    div(data-prop="flat").destination__input-box.destination__input-box--half
      Input(name="flat" v-model="addressItem.flat" label="Квартира/офис" )

    .destination__input-box
      Input(name="zip" label="Индекс" v-model="addressItem.index" :rules="['required']")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Input from '@/components/Input.vue';
import { UserAddressItem } from '@/models/models';

declare let $: any;

@Component({
  components: { Input },
})
export default class Destination extends Vue {
  @Prop() public addressItem!: UserAddressItem | object;

  initKladr() {
    const self = this;
    const $container = $(this.$el);

    const $zip = $container.find('[name="zip"]');
    const $district = $container.find('[name="district"]');
    const $city = $container.find('[name="c"]');
    const $street = $container.find('[name="s"]');
    const $building = $container.find('[name="building"]');

    // tslint:disable-next-line
    $.fias.setDefault({
      parentInput: '.destination',
      verify: true,
      select(obj) {
        const fieldProp = this.closest('.destination__input-box').dataset.prop;
        self.$nextTick(() => {
          Vue.set(self.addressItem, fieldProp, obj.name);
        });
        if (obj.contentType === 'city') {
          $street.fias('parentId', obj.id);
          $building.fias('parentId', obj.id);
          Vue.set(self.addressItem, 'cityType', obj.type);
        }
        if (obj.contentType === 'street') {
          $building.fias('parentId', obj.id);
          Vue.set(self.addressItem, 'streetType', obj.type);
        }
      },
      check(obj) {
        const $input = $(this);
        if (!obj) {
          self.showError($input, 'Введено неверно');
        }
      },
      checkBefore() {
        const $input = $(this);
        return $.trim($input.val());
      },
      change(obj) {
        if (obj && obj.parents) {
          $.fias.setValues(obj.parents, '.js-form-address');
        }

        if (obj && obj.zip) {
          self.$nextTick(() => {
            Vue.set(self.addressItem, 'index', obj.zip);
          });
        }
      },
    });

    $city.fias('type', $.fias.type.city);
    $street.fias('type', $.fias.type.street);
    $building.fias('type', $.fias.type.building);

    $district.fias('withParents', true);
    $city.fias('withParents', true);
    $street.fias('withParents', true);

    $street.fias('parentType', $.fias.type.city);
    $building.fias('parentType', $.fias.type.street);

    // Отключаем проверку введённых данных для строений
    $building.fias('verify', false);
  }

  showError($input, message) {
    // console.log('showError -> ');
    // console.log(message);
  }

  mounted() {
    this.initKladr();
  }
}
</script>

<style scoped lang="scss">
  .destination {

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @include tablet() {
      margin-right: -16px;
    }

    &__legend {
      font-size: 16px;
      font-weight: 600;
      color: $grey-2;
      margin-bottom: 13px;
      width: 100%;

      @include tablet() {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 33px;
      }
    }

    &__input-box {
      position: relative;
      margin-bottom: 25px;
      width: 100%;

      &--half {
        width: 49%;
      }

      @include tablet() {
        width: 30%;
        flex-grow: 1;
        margin-right: 16px;

        &--half {
          width: 30%;
        }
      }

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    &__input {
      padding: 15px 20px;
      border: 1px solid $grey-11;
      border-radius: 4px;
      font-size: 16px;
      color: $black-1;
      display: block;
      width: 100%;
      box-sizing: border-box;
    }

    &__select {
      margin-bottom: 25px;
    }

    &__label {
      display: none;
      position: absolute;
      top: 0;
      left: 15px;
      padding: 0 5px;
      transform: translate(0, -50%);
      font-size: 12px;
      color: $grey-2;
      background-color: #fff;
    }
  }

  .destination__input:not(:placeholder-shown) + .destination__label {
    display: inline;
  }

  .destination__input:focus + .destination__label {
    color: $blue-2;
  }

  .destination__input:focus {
    border: 1px solid $blue-2;
    outline: none;
  }

  .destination__input:required + .destination__label::after {
    content: " *";
    font-size: 12px;
    color: $red-1;
  }
</style>
