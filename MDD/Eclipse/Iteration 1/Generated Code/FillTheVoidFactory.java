/**
 */
package com.garagu.emf.fillthevoid.model.FillTheVoid;

import org.eclipse.emf.ecore.EFactory;

/**
 * <!-- begin-user-doc -->
 * The <b>Factory</b> for the model.
 * It provides a create method for each non-abstract class of the model.
 * <!-- end-user-doc -->
 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage
 * @generated
 */
public interface FillTheVoidFactory extends EFactory {
	/**
	 * The singleton instance of the factory.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	FillTheVoidFactory eINSTANCE = com.garagu.emf.fillthevoid.model.FillTheVoid.impl.FillTheVoidFactoryImpl.init();

	/**
	 * Returns a new object of class '<em>Gallery</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Gallery</em>'.
	 * @generated
	 */
	Gallery createGallery();

	/**
	 * Returns a new object of class '<em>Painting</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Painting</em>'.
	 * @generated
	 */
	Painting createPainting();

	/**
	 * Returns the package supported by this factory.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the package supported by this factory.
	 * @generated
	 */
	FillTheVoidPackage getFillTheVoidPackage();

} //FillTheVoidFactory
